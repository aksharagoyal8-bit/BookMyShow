import React, { useState,useEffect} from "react";
import { Table } from "antd";
import { getAllMovies } from "../../api/movie";
export default function MovieList(){

  const [movies,setMovies]=useState([]);

  
    const tabheads=[
        {title:"Poster",
         dataIndex:"poster",
        },
        { 
          title:"Movie Name",
          dataIndex:"movieName",
        },
        { 
          title:"Description",
          dataIndex:"description",
        },
        { 
          title:"Duration",
          dataIndex:"duration",
        },
         { 
          title:"Genre",
          dataIndex:"genre",
        },
        { 
          title:"Language",
          dataIndex:"language",
        },
         { 
          title:"Release Date",
          dataIndex:"releaseDate",
        },
        { 
          title:"Action",
         
        },

    ]

    useEffect(()=>{
      const getData=async()=>{
        const resp=await getAllMovies();
       
        setMovies(resp.data);
      }
      getData();
    },[]);
    return(
        <div><Table columns={tabheads} dataSource={movies}/></div>
    )
}