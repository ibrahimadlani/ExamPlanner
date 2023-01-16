package com.greglturnquist.payroll.Model;

import com.mysql.cj.xdevapi.Schema;


import javax.persistence.*;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.time.temporal.ChronoUnit;

@Entity
public class Planning {
    private @Id @GeneratedValue
    Long id;
    private LocalDateTime debut;
    private LocalDateTime fin;
    @ManyToMany
    private List<Indisponibilite> indisponibilites;
    @OneToMany(cascade=CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Examen> examens;
    @ManyToMany(cascade= CascadeType.ALL)
    private List<Fermeture> fermetures;
    @ManyToMany
    private List<Matiere> matieres;
    private int matin_heure;
    private int matin_minute;
    private int soir_heure;
    private int soir_minute;

    public Planning() {
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Planning(LocalDateTime debut, LocalDateTime fin, List<Indisponibilite> indisponibilites, int matin_heure, int matin_minute, int soir_heure, int soir_minute, List<Matiere> matieres){
        this.debut = debut;
        this.fin = fin;
        this.indisponibilites = indisponibilites;
        this.examens =  new ArrayList();
        this.fermetures =  new ArrayList();
        this.matin_heure = matin_heure;
        this.matin_minute = matin_minute;
        this.soir_heure = soir_heure;
        this.soir_minute = soir_minute;
        this.matieres = matieres;
        this.addFermetures();
    }

    public LocalDateTime getDebut() {
        return debut;
    }

    public LocalDateTime getFin() {
        return fin;
    }

    public List<Examen> getExamens() {
        return examens;
    }

    public List<Indisponibilite> getIndisponibilites() {
        return indisponibilites;
    }

    public void setDebut(LocalDateTime debut) {
        this.debut = debut;
    }

    public void setExamens(List<Examen> examens) {
        this.examens = examens;
    }

    public void setFin(LocalDateTime fin) {
        this.fin = fin;
    }

    public void setIndisponibilites(List<Indisponibilite> indisponibilites) {
        this.indisponibilites = indisponibilites;
    }

    public int countDays(){
        return (int) ChronoUnit.DAYS.between(debut, fin);
    }


    public void addFermetures(){

        LocalDateTime dateEnCours = this.debut;
        for (int i = 0 ; i < this.countDays(); i++){
            System.out.println("" + this.countDays());
            System.out.println(dateEnCours.getDayOfMonth());

            System.out.println(dateEnCours.getDayOfWeek().name() + "   " +  dateEnCours.getDayOfWeek().getValue());

            if(dateEnCours.getDayOfWeek().getValue() == 6 || dateEnCours.getDayOfWeek().getValue() == 7){
                this.addFermeture(new Fermeture(LocalDateTime.of(dateEnCours.getYear(), dateEnCours.getMonth(), dateEnCours.getDayOfMonth(), 0, 0), false, 0, 0));
            }else{
                this.addFermeture(new Fermeture(LocalDateTime.of(dateEnCours.getYear(), dateEnCours.getMonth(), dateEnCours.getDayOfMonth(), matin_heure, matin_minute), true, matin_heure, matin_minute));
                this.addFermeture(new Fermeture(LocalDateTime.of(dateEnCours.getYear(), dateEnCours.getMonth(), dateEnCours.getDayOfMonth(), soir_heure, soir_minute), false, soir_heure, soir_minute));
            }

            dateEnCours = dateEnCours.plusDays(1);
        }
    }

    public void genererListeExams(){
        System.out.println(this.matieres);
        System.out.println(this.matieres.size());
    }

    public boolean isExamenPossible(Examen examen){
        for (Indisponibilite indisponibilite : this.indisponibilites) { if (examen.isOverlap(indisponibilite)){ return false; } }
        for (Examen exam : this.examens) { if (examen.isOverlap(exam)){ return false; } }
        for (Fermeture fermeture : this.fermetures) { if (examen.isOverlap(fermeture)){ return false; } }
        return true;
    }

    public void addExamen(Examen examen){
        if(this.isExamenPossible(examen)){ this.examens.add(examen); }
        else{ System.out.println("Examen non possible"); }
    }

    public void addIndisponibilite(Indisponibilite indisponibilite){
        this.indisponibilites.add(indisponibilite);
    }


    public void generate(){
        List<Creneau> allEvents = new ArrayList<>();
        allEvents = allEventsSorted();
        List<Creneau> disponibilites = new ArrayList<>();

        try {

            // Creation des dispos
            for (int i = 0; i < allEvents.size() - 1; i++) {
                if (allEvents.get(i).getFin() != allEvents.get(i + 1).getDebut()) {
                    Creneau c = new Creneau(allEvents.get(i).getFin(), allEvents.get(i + 1).getDebut());

                    if (c.getDuree_min() != 0) {
                        if (c.getDuree_min() > 120) {
                            Creneau c1 = new Creneau(c.getDebut(), 120);
                            Creneau c2 = new Creneau(c1.getFin(), c.getDuree_min() - 120);
                            disponibilites.add(c1);
                            disponibilites.add(c2);
                        } else {
                            disponibilites.add(c);
                        }
                    }
                }
            }

            for (Creneau c : disponibilites
            ) {
                System.out.println(c.getDebut() + "    " + c.getFin() + "    " + c.getDuree_min());
            }

            //Parcours des matieres pour assigner des créneau d'examens
            for (int i = 0; i < matieres.size(); i++) {
                Creneau c = disponibiliteParfaitePourUnExamen(matieres.get(i).getDuree_examen(), disponibilites);
                if (c != null) {
                    System.out.println("Examen trouvé ! " + matieres.get(i).getNom() + "    " + c.getDebut() + "    " + c.getFin() + "    " + c.getDuree_min());
                    Examen examen = new Examen(c.getDebut(), c.getDuree_min(), matieres.get(i));
                    try {
                        examens.add(examen);
                    } catch (Exception e) {
                        System.out.println(e);
                    }

                } else {
                    c = disponibiliteImparfaitePourUnExamen(matieres.get(i).getDuree_examen(), disponibilites);
                    if(c!=null){
                        System.out.println("Examen trouvé ? " + matieres.get(i).getNom() + "    " + c.getDebut() + "    " + c.getFin() + "    " + c.getDuree_min() + "    " + matieres.get(i).getDuree_examen());
                        Examen examen = new Examen(c.getDebut(), c.getDuree_min(), matieres.get(i));
                        try {
                            examens.add(examen);
                        } catch (Exception e) {
                            System.out.println(e);
                        }
                    }else{
                        System.out.println("Aucun créneau n'a été trouvé pour l'examen : " + matieres.get(i).getNom());
                    }
                }
            }

            disponibilites.clear();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Creneau disponibiliteParfaitePourUnExamen(int duree, List<Creneau> disponibilites){
        for (int i = 0; i < disponibilites.size(); i++) {
            Creneau c = disponibilites.get(i);
            if (duree == c.getDuree_min()) {
                Creneau c_bis = disponibilites.remove(i);
                return c_bis;
            }
        }
        return null;
    }

    public Creneau disponibiliteImparfaitePourUnExamen(int duree, List<Creneau> disponibilites){
        List<List> possibilites = new ArrayList<>();
        List<Object> tupleIdeal = null;


        for (int i = 0; i < disponibilites.size(); i++) {
            List<Object> tuple = new ArrayList<>();
            Creneau c = disponibilites.get(i);
            if (duree < c.getDuree_min()) {
                tuple.add(c);
                tuple.add(c.getDuree_min() - duree);
                possibilites.add(tuple);
            }
        }

        if(possibilites.size()>0) {
            tupleIdeal = possibilites.get(0);
            for(int i = 1; i < possibilites.size(); i++){
                if((int) possibilites.get(i).get(1) < (int) tupleIdeal.get(1)) {
                    tupleIdeal = possibilites.get(i);
                }
            }
        }

        if(tupleIdeal == null){
            return null;
        }

        Creneau creneauSelectionne = (Creneau) tupleIdeal.get(0);
        Creneau creneauExamen = new Creneau(creneauSelectionne.getDebut(), duree);
        Creneau creneauRestant = new Creneau(creneauExamen.getFin(), creneauSelectionne.getDuree_min() - creneauExamen.getDuree_min());
        disponibilites.remove(creneauSelectionne);
        disponibilites.add(creneauRestant);

        return creneauExamen;
    }

    public List<Creneau> allEventsSorted(){
        List<Creneau> allEventsSorted = new ArrayList<>();

        allEventsSorted.addAll(indisponibilites);
        allEventsSorted.addAll(fermetures);
        allEventsSorted.addAll(examens);

        for (int i = 0; i < allEventsSorted.size(); i++) {
            for (int j = i; j < allEventsSorted.size(); j++) {
                if(allEventsSorted.get(i).getDebut().isAfter(allEventsSorted.get(j).getDebut())){
                    Collections.swap(allEventsSorted, i, j);
                    /*
                    LocalDateTime tmp = allEventsSorted.get(i).getDebut();
                    allEventsSorted.get(i).setDebut(allEventsSorted.get(j).getDebut());
                    allEventsSorted.get(j).setDebut(tmp);
                     */
                }
            }
        }

        return allEventsSorted;
    }

    public Creneau eventAtATime(LocalDateTime time){
        for (Creneau c: allEventsSorted()
             ) {
            if(time.isEqual(c.getDebut())){
                return c;
            }
            if (time.isAfter(c.getDebut()) && time.isBefore(c.getFin())){
                return c;
            }
        }
        return null;
    }

    public void exportExcel(){
        try {
            FileWriter myWriter = new FileWriter("/Users/alcidefaucheron/Documents/Projets/ExamPlanner/back/events/src/main/resources/Data/export.csv");

            long nbColonnes = ChronoUnit.DAYS.between(debut, fin);

            myWriter.write("h:m;");

        for (int i = 0; i < nbColonnes; i++) {
                myWriter.write(debut.plusDays(i).toString() + ";");
            }

            myWriter.write("\n");
            LocalDateTime time;
            Creneau c;

            for (int i = 0; i < 48; i++) {
                String ligne = new Integer(debut.plusMinutes(i*30).getHour()).toString() + ":" + new Integer(debut.plusMinutes(i*30).getMinute()).toString() + ";";

                for (int j = 0; j < nbColonnes; j++) {
                    time = debut.plusDays(j).plusMinutes(i*30);
                    c = eventAtATime(time);
                    if(c != null){
                        if(c instanceof Examen){
                            Examen exam = (Examen) c;
                            ligne += "Examen (" + exam.getMatiere().getNom() + ");";
                        }else {
                            ligne += c.getClass().getSimpleName() + ";";
                        }
                        //ligne += time + ";";
                    }else{
                        ligne += "Vide;";
                    }

                }
                myWriter.write(ligne+"\n");
            }

            myWriter.close();

            System.out.println("Export reussi");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

    public void addFermeture(Fermeture fermeture){
        this.fermetures.add(fermeture);
    }

    public int getMatin_heure() {
        return matin_heure;
    }

    public int getMatin_minute() {
        return matin_minute;
    }

    public int getSoir_heure() {
        return soir_heure;
    }

    public int getSoir_minute() {
        return soir_minute;
    }

    public List<Fermeture> getFermetures() {
        return fermetures;
    }

    public void setFermetures(List<Fermeture> fermetures) {
        this.fermetures = fermetures;
    }

    public void setMatin_heure(int matin_heure) {
        this.matin_heure = matin_heure;
    }

    public void setMatin_minute(int matin_minute) {
        this.matin_minute = matin_minute;
    }

    public void setSoir_heure(int soir_heure) {
        this.soir_heure = soir_heure;
    }

    public void setSoir_minute(int soir_minute) {
        this.soir_minute = soir_minute;
    }

    public List<Matiere> getMatieres() {
        return matieres;
    }

    public void setMatieres(List<Matiere> matieres) {
        this.matieres = matieres;
    }

    @Override
    public String toString() {
        return "Planning{" +
                "indisponibilites=" + indisponibilites +
                ", examens=" + examens +
                ", fermetures=" + fermetures +
                '}';
    }
}
