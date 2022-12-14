package model.dao;

import model.Asiakas;

import java.nio.file.FileSystems;
import java.sql.*;
import java.util.ArrayList;

public class Dao {
    private String db ="Myynti.sqlite";
    private Connection con;
    private PreparedStatement stmtPrep=null;
    private ResultSet rs = null;

    private Connection yhdista(){
        Connection con = null;
        String path = System.getProperty("catalina.base");
        path += "/webapps/";
        String url = "jdbc:sqlite:" + path + db;
        System.out.println(url);
        try {
            Class.forName("org.sqlite.JDBC");
            con = DriverManager.getConnection(url);
            System.out.println("Yhteys avattu.");
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
        String sql = "SELECT * FROM asiakkaat ORDER BY asiakas_id DESC ";
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

    public boolean lisaaAsiakas(Asiakas asiakas) {
        System.out.println("lisaaAsiakas");
        String sql = "INSERT INTO asiakkaat (etunimi, sukunimi, puhelin, sposti) VALUES (?, ?, ?, ?)";
        boolean success = true;
        try {
            con=yhdista();
            if(con!=null){ //jos yhteys onnistui
                stmtPrep = con.prepareStatement(sql);
                stmtPrep.setString(1, asiakas.getEtunimi());
                stmtPrep.setString(2, asiakas.getSukunimi());
                stmtPrep.setString(3, asiakas.getPuhelin());
                stmtPrep.setString(4, asiakas.getSposti());
                stmtPrep.executeUpdate();
            }
        } catch (Exception e) {
            success = false;
            e.printStackTrace();
        } finally {
            sulje();
        }

        return success;
    }
    
    public boolean poistaAsiakas(int id) {
        System.out.println("poistaAsiakas");
        String sql = "DELETE FROM asiakkaat WHERE asiakas_id = ?";
        boolean success = true;
        try {
            con=yhdista();
            if(con!=null){ //jos yhteys onnistui
                stmtPrep = con.prepareStatement(sql);
                stmtPrep.setInt(1, id);
                stmtPrep.executeUpdate();
            }
        } catch (Exception e) {
            success = false;
            e.printStackTrace();
        } finally {
            sulje();
        }

        return success;
    }

    public boolean muutaAsiakastietoja(Asiakas asiakas){
        boolean success = true;
        String sql = "UPDATE asiakkaat SET etunimi=?, sukunimi=?, puhelin=?, sposti=? WHERE asiakas_id=?";
        try {
            con = yhdista();
            stmtPrep=con.prepareStatement(sql);
            stmtPrep.setString(1, asiakas.getEtunimi());
            stmtPrep.setString(2, asiakas.getSukunimi());
            stmtPrep.setString(3, asiakas.getPuhelin());
            stmtPrep.setString(4, asiakas.getSposti());
            stmtPrep.setInt(5, asiakas.getId());
            stmtPrep.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            success=false;
        } finally {
            sulje();
        }

        return success;
    }

    public String etsiAsiakas(String uid, String pwd) {
        String nimi = null;
        String sql="SELECT * FROM asiakkaat WHERE sposti=? AND salasana=?";
        try {
            con = yhdista();
            if(con!=null){
                stmtPrep = con.prepareStatement(sql);
                stmtPrep.setString(1, uid);
                stmtPrep.setString(2, pwd);
                rs = stmtPrep.executeQuery();
                if(rs.isBeforeFirst()){ //jos kysely tuotti dataa, eli asiakas löytyi
                    rs.next();
                    nimi = rs.getString("etunimi")+ " " +rs.getString("sukunimi");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sulje();
        }

        return nimi;
    }
}
