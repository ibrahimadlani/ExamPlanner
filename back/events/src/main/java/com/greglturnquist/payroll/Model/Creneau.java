package com.greglturnquist.payroll.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
public class Creneau {
    private @Id
    @GeneratedValue
    Long id;
    private LocalDateTime debut;
    private LocalDateTime fin;
    private int indexSemaine;
    private int duree_min;

    public Creneau(LocalDateTime debut, int duree_min){
        this.debut = debut;
        this.duree_min = duree_min;
        this.fin = addMinutesToDate(duree_min, this.debut);
    }

    public Creneau(LocalDateTime debut, LocalDateTime fin){
        this.debut = debut;
        this.fin = fin;
        duree_min = (int) ChronoUnit.MINUTES.between(debut, fin);
    }

    public Creneau() {}

    public LocalDateTime getDebut() {
        return debut;
    }

    public int getDuree_min() {
        return duree_min;
    }

    public void setDebut(LocalDateTime debut) {
        this.debut = debut;
    }

    public void setDuree_min(int duree_min) {
        this.duree_min = duree_min;
    }

    public void setFin(LocalDateTime fin) {
        this.fin = fin;
    }

    public int getIndexSemaine() {
        return indexSemaine;
    }

    public void setIndexSemaine(int indexSemaine) {
        this.indexSemaine = indexSemaine;
    }

    public LocalDateTime getFin() {
        return fin;
    }

    public static LocalDateTime addMinutesToDate(int minutes, LocalDateTime beforeTime) {
        LocalDateTime newDate = beforeTime.plusMinutes(minutes);
        return newDate;
    }


    public boolean isOverlap(Creneau creneau){
         return ((this.debut.isBefore(creneau.fin) || this.debut.isEqual(creneau.fin)) && ((this.fin.isAfter(creneau.debut) || this.fin.isEqual(creneau.debut))));
    }


    @Override
    public String toString() {
        return "Creneau{" +
                "id=" + id +
                ", debut=" + debut +
                ", fin=" + fin +
                ", duree_min=" + duree_min +
                '}';
    }
}
