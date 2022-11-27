package control;

import com.google.gson.Gson;
import model.Asiakas;
import model.dao.Dao;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.stream.Collectors;

@WebServlet(name = "Asiakkaat", value = "/Asiakkaat/*")
public class Asiakkaat extends HttpServlet {

    public Asiakkaat() {
        System.out.println("Asiakkaat");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("doGet");
        Dao dao = new Dao();
        ArrayList<Asiakas> asiakaslista = dao.listaaAsiakkaat();
        String strJSON = new Gson().toJson(asiakaslista);
        response.setContentType("application/json; charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(strJSON);
    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("doPut");
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("doDelete");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("doPost");
        String strJSONInput = request.getReader().lines().collect(Collectors.joining());
        Asiakas asiakas = new Gson().fromJson(strJSONInput, Asiakas.class);

        Dao dao = new Dao();
        boolean success = dao.lisaaAsiakas(asiakas);

        response.setContentType("application/json; charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println("{\"success\": " + success + "}");
    }
}
