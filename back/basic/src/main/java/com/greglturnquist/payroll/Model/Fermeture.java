package com.greglturnquist.payroll.Model;

import javax.persistence.Entity;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class Fermeture extends Creneau{
    private boolean matin;
    private int heure;
    private int minute;

    public Fermeture(LocalDateTime debut, boolean matin, int heure, int minute){
        super(debut,0);
        this.matin = matin;
        this.heure = heure;
        this.minute = minute;

        /*
        if(matin){
            this.setDebut(new Date(this.getDebut().getYear(),this.getDebut().getMonth(),this.getDebut().getMinutes(), 0,0));
            this.setDuree_min(heure*60+minute);
        }
        else {
            this.setDebut(new Date(this.getDebut().getYear(),this.getDebut().getMonth(),this.getDebut().getMinutes(), this.heure,this.minute));
            this.setDuree_min(1440 - heure * 60 + minute); }
            this.setFin(this.addMinutesToDate(this.getDuree_min(), this.getDebut()));

         */
    }

    public Fermeture() {
    }

    @Override
    public String toString() {
        return "\nFermeture{" +
                "matin=" + matin +
                ", heure=" + heure +
                ", minute=" + minute +
                "} " + super.toString();
    }
}
