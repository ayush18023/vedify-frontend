import React,{useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Redux/Pages'


export default function DataTable() {
    const {products}=useSelector(state=>state.page)
    
    const rows = []
    products.forEach((products,index) => {
        rows.push({name:products.name,price:products.price,id:index,Rating:products.avg_rating})
    });

    const columns = [
  
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'price', headerName: 'Price',type:'number', width: 130 },
        {
          field: 'rating',
          headerName: 'Rating',
          type: 'number',
          width: 90,
          valueGetter: (params) =>
            `${params.row._id || ''}`,
        },
        
      ];

      const dispatch=useDispatch()



    useEffect(() => {
        dispatch(getProducts())
    }, [])
    
  return (
    <>
        
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
        />
        </div>
    </>
  );
}
