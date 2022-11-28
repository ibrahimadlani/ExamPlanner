package com.ibrahim;

import java.util.Date;

public class Creneau {
    private int id;
    private Date debut;
    private Date fin;
    private int duree_min;


    public Creneau(int id, Date debut, int duree_min){
        this.id = id;
        this.debut = debut;
        this.duree_min = duree_min;
        this.fin = addMinutesToDate(duree_min, this.debut);


    }

    public int getId() {
        return id;
    }

    public Date getDebut() {
        return debut;
    }

    public int getDuree_min() {
        return duree_min;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDebut(Date debut) {
        this.debut = debut;
    }

    public void setDuree_min(int duree_min) {
        this.duree_min = duree_min;
    }

    public void setFin(Date fin) {
        this.fin = fin;
    }

    public Date getFin() {
        return fin;
    }

    public static Date addMinutesToDate(int minutes, Date beforeTime) {
        return new Date(beforeTime.getTime() + (minutes * 60000));
    }

    public boolean isOverlap(Creneau creneau){
         return ((this.debut.before(creneau.fin) || this.debut.equals(creneau.fin)) && ((this.fin.after(creneau.debut) || this.fin.equals(creneau.debut))));
    }
}
