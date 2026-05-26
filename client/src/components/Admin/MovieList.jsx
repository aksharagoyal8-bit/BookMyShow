import React from "react";
import { Table } from "antd";
export default function MovieList(){
    const tabheads=[
        {title:"Poster"

        },
        { 
          title:"Movie Name",
          dataIndex:"Name",
        },
        { 
          title:"Description",
          dataIndex:"Description",
        },
        { 
          title:"Duration",
          dataIndex:"Duration",
        },
         { 
          title:"Genre",
          dataIndex:"Genre",
        },
        { 
          title:"Language",
          dataIndex:"Language",
        },
         { 
          title:"Release Date",
          dataIndex:"Release Date",
        },
        { 
          title:"Action",
         
        },

    ]
    return(
        <div><Table columns={tabheads}/></div>
    )
}