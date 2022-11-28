package com.ibrahim;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class Planning {
    private int id;
    private Date debut;
    private Date fin;
    private List<Indisponibilite> indisponibilites;
    private List<Examen> examens;
    private List<Fermeture> fermetures;
    private List<Matiere> matieres;
    private int matin_heure;
    private int matin_minute;
    private int soir_heure;
    private int soir_minute;

    public Planning(int id, Date debut, Date fin, List<Indisponibilite> indisponibilites, int matin_heure, int matin_minute, int soir_heure, int soir_minute,List<Matiere> matieres){
        this.id = id;
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

    public int getId() {
        return id;
    }

    public Date getDebut() {
        return debut;
    }

    public Date getFin() {
        return fin;
    }

    public List<Examen> getExamens() {
        return examens;
    }

    public List<Indisponibilite> getIndisponibilites() {
        return indisponibilites;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDebut(Date debut) {
        this.debut = debut;
    }

    public void setExamens(List<Examen> examens) {
        this.examens = examens;
    }

    public void setFin(Date fin) {
        this.fin = fin;
    }

    public void setIndisponibilites(List<Indisponibilite> indisponibilites) {
        this.indisponibilites = indisponibilites;
    }

    public int countDays(){
        return (int) (Math.abs(this.fin.getTime() - this.debut.getTime()) / (1000 * 60 * 60 * 24))+1;
    }

    public void addFermetures(){
        for (int i = 0 ; i < this.countDays(); i++){
            Calendar cal = Calendar.getInstance();
            cal.setTime(this.debut);
            cal.add(Calendar.DATE, i);
            Date dateWith5Days = cal.getTime();
            this.addFermeture(new Fermeture(1,dateWith5Days,true,this.matin_heure, this.matin_minute));
            this.addFermeture(new Fermeture(1,dateWith5Days,false,this.soir_heure, this.soir_minute));
        }
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
        for (Matiere matiere: this.matieres) {
            Date tentative = this.debut;
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
}
