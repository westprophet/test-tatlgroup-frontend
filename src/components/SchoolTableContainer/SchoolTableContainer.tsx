import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {IColumn, IRate, ISchoolboy} from "../../interfaces/";
import cn from "classnames";

import {getSchoolboys} from "../../api/schoolboysAPI";
import {getColumns} from "../../api/columnsAPI";
import {addRate, getRate, unRate} from "../../api/rateAPI";


interface TableColumn {
    column_id: string;
    name: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

interface TableData {
    [c: string]: string;
}

//Преобразовываем строки в нужный для таблицы вид
function createRow(number: number, schoolboy: ISchoolboy, rate: Array<IRate>, columns: IColumn[]): TableData {
    const name = `${schoolboy.FirstName ?? ''} ${schoolboy.SecondName ?? ''}  ${schoolboy.LastName}`;
    const res = {id: schoolboy.Id, number: String(number), name: name};
    columns.forEach((column) => {
        const rt = rate.find((rt) => rt.ColumnId === column.Id);
        // @ts-ignore
        res[column.Title] = rt ? rt.Title : '';
    })
    return res;
}

//Преобразовываем колонки в нужный для таблицы вид
function createRateColumn(column: IColumn): TableColumn {
    return {column_id: column.Id, name: column.Title, label: column.Title, align: 'center'};
}

const createStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 'calc(100vh - 60px)',
    },
    cell: {
        transition: '.3s',
        cursor: 'pointer',
        '&:hover': {
            transition: '.3s',
            backgroundColor: "grey",
            color: 'white'
        },
    },
    rightLine: {
        borderRight: '1px solid rgba(224, 224, 224, 1)',
    }
});


const staticColumns: TableColumn[] = [
    {
        column_id: "number",
        name: 'number',
        label: "N",
        minWidth: 20,
    },
    {
        column_id: "name",
        name: 'name',
        label: "Ученик",
        minWidth: 150,
    }
];


export default function SchoolTableContainer() {
    const [load, setLoad] = React.useState<boolean>(true);
    const [tableData, setTableData] = React.useState<{ columns: TableColumn[], rows: TableData[] } | undefined>();

    const reload = async () => {
        //Получаем данные
        const columnsData = await getColumns();
        const rateData = await getRate();
        const schoolboysData = await getSchoolboys();
        if (!columnsData || !rateData || !schoolboysData) return;

        //Фильтруем пропуски по ученику и формируем строки
        const rows = schoolboysData.Items.map((sb, index) => createRow(++index, sb, rateData.Items.filter((rt) => sb.Id === rt.SchoolboyId), columnsData.Items))
        //Формируем колонки и добавляем статические колонки в начало
        const columns = [...staticColumns, ...columnsData.Items.map((i) => createRateColumn(i))];

        //Обновляем состояние таблицы
        if (columns && rows)
            setTableData({
                columns: columns,
                rows: rows,
            });
        else
            setTableData(undefined);
    }

    const classes = createStyles();

    useEffect(() => {
        reload().then(r => {
            //выключаем прелоудер если все загрузилось и создалось корректно
            setLoad(false);
        });
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    if (!tableData)
        return <h1 style={{lineHeight: '100vh'}}>Данных нет но вы держитесь! Ну или проверьте сервер</h1>
    else if (load)
        return <h1 style={{lineHeight: '100vh'}}> Загрузка... </h1>


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    //Переключатель количества элементов на странице
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Можно поставить прелоудер
    const _rows = tableData.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    //При нажатии на ячейку
    const onClickCell = (column: TableColumn, row: TableData) => {
        const value: string = row[column.name];
        if (!value) {
            addRate(row.id, column.column_id).then((r) => {
                if (r === 200) reload().then(() => setLoad(false));
            });
        } else {
            unRate(row.id, column.column_id).then((r) => {
                if (r === 200) reload().then(() => setLoad(false));
            });
        }
    }
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {tableData.columns.map((column) => {
                                if (column.column_id !== 'id')//скрываем id колоеку
                                    return (
                                        <TableCell
                                            key={column.name}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_rows.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {tableData.columns.map((column) => {
                                        const value = row[column.name];
                                        if (column.column_id !== 'id') {//скрываем id колоеку{
                                            const staticColumn = (column.name !== 'name' && column.name !== 'number');
                                            return (
                                                <TableCell
                                                    className={cn({
                                                        [classes.cell]: staticColumn,
                                                        [classes.rightLine]: column.name === 'name'
                                                    })}
                                                    onClick={staticColumn ? () => onClickCell(column, row) : () => {
                                                    }}
                                                    key={column.name}
                                                    align={column.align}
                                                >
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        }
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[25, 100]}
                component="div"
                count={_rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

