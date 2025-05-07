package com.microsoft.sqlserver.DAO;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Vector;

import com.microsoft.sqlserver.DTO.productDTO;

public class exportDAO extends receiptDAO{
    public connectDatabase cndb = new connectDatabase() ;
    Vector<productDTO> productList = new Vector<productDTO>() ;
    Statement statement = null ;

    public Vector<productDTO> getProductList(){
        return productList ;
    }

}