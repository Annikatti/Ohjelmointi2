package model.dao;

import model.Asiakas;

import java.nio.file.FileSystems;
import java.sql.*;
import java.util.ArrayList;

public class Dao {
    private String db ="\\Asiakas.sqlite";
    private Connection con;
    private PreparedStatement stmtPrep=null;
    private ResultSet rs = null;

    private Connection yhdista(){
        Connection con = null;
        String path = System.getProperty("user.dir");
        String url = "jdbc:sqlite:" + path + db;
        System.out.println(url);
        try {
            Class.forName("org.sqlite.JDBC");
            con = DriverManager.getConnection(url);
            // System.out.println("Yhteys avattu.");
        } catch (Exception e){
            System.out.println("Yhteyden avaus epäonnistui.");
            e.printStackTrace();
        }
        return con;
    }

    private void sulje() {
        if (stmtPrep != null) {
            try {
                stmtPrep.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (con != null) {
            try {
                con.close();
                System.out.println("Yhteys suljettu.");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public ArrayList<Asiakas> listaaAsiakkaat() {
        System.out.println("listaaAsiakkaat");
        ArrayList<Asiakas> asiakaslista = new ArrayList<Asiakas>();
        String sql = "SELECT * FROM asiakkaat ORDER BY id DESC ";
        try {
            con=yhdista();
            if(con!=null){ //jos yhteys onnistui
                stmtPrep = con.prepareStatement(sql);
                rs = stmtPrep.executeQuery();
                if(rs!=null){ //jos kysely onnistui
                    while(rs.next()){
                        Asiakas asiakas = new Asiakas();
                        asiakas.setId(rs.getInt(1));
                        asiakas.setEtunimi(rs.getString(2));
                        asiakas.setSukunimi(rs.getString(3));
                        asiakas.setPuhelin(rs.getString(4));
                        asiakas.setSposti(rs.getString(5));

                        asiakaslista.add(asiakas);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sulje();
        }

        return asiakaslista;
    }
}
