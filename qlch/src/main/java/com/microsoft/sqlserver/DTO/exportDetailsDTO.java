package com.microsoft.sqlserver.DTO;

public class exportDetailsDTO {
    private String receiptID;
    private String productID;
    private int quantity;
    private double price;

    
    public exportDetailsDTO() {
    }

    public exportDetailsDTO(String receiptID, String productID, int quantity, double price) {
        this.receiptID = receiptID;
        this.productID = productID;
        this.quantity = quantity;
        this.price = price;
    }

    public String getReceiptID() {
        return receiptID;
    }

    public void setReceiptID(String receiptID) {
        this.receiptID = receiptID;
    }

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

}
