package com.greglturnquist.payroll.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Entity
public class Planning {
    private @Id @GeneratedValue
    Long id;

    private LocalDateTime debut;
    private LocalDateTime fin;
    @ManyToMany
    private List<Indisponibilite> indisponibilites;
    @ManyToMany
    private List<Examen> examens;
    @ManyToMany
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

        //this.addFermetures();
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
        return (int) (Math.abs(this.fin.getHour() - this.debut.getHour()) / (1000 * 60 * 60 * 24))+1;
    }


    public void addFermetures(){
        for (int i = 0 ; i < this.countDays(); i++){
            Calendar cal = Calendar.getInstance();
            cal.setTime(Date.from(this.debut.toInstant((ZoneOffset) ZoneId.systemDefault())));
            cal.add(Calendar.DATE, i);
            Date dateWith5Days = cal.getTime();
            this.addFermeture(new Fermeture(dateWith5Days.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime(),true,this.matin_heure, this.matin_minute));
            this.addFermeture(new Fermeture(dateWith5Days.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime(),false,this.soir_heure, this.soir_minute));
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
            LocalDateTime tentative = this.debut;
        }
    }

    public List<Creneau> allEventsSorted(){
        List<Creneau> allEventsSorted = new ArrayList<>();

        allEventsSorted.addAll(indisponibilites);
        allEventsSorted.addAll(fermetures);
        allEventsSorted.addAll(examens);

        for (int i = 0; i < allEventsSorted.size(); i++) {
            for (int j = i; j < allEventsSorted.size(); j++) {
                if(allEventsSorted.get(i).getDebut().isAfter(allEventsSorted.get(j).getDebut())){
                    LocalDateTime tmp = allEventsSorted.get(i).getDebut();
                    allEventsSorted.get(i).setDebut(allEventsSorted.get(j).getDebut());
                    allEventsSorted.get(j).setDebut(tmp);
                }
            }
        }

        return allEventsSorted;
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

    @Override
    public String toString() {
        return "Planning{" +
                "indisponibilites=" + indisponibilites +
                ", examens=" + examens +
                ", fermetures=" + fermetures +
                '}';
    }
}
