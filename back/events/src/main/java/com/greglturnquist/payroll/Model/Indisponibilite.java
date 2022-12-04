package com.greglturnquist.payroll.Model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Indisponibilite extends Creneau{
    @ManyToOne
    @JoinColumn(name = "enseignent_id")
    private Personne enseignent;

    public Indisponibilite(int id, LocalDateTime debut, int duree_min, Personne enseignent){
        super(debut, duree_min);
        if (enseignent.isEnseignant()){ this.enseignent = enseignent; }
    }
    public Indisponibilite() {
        super();
    }

    public Personne getEnseignent() {
        return enseignent;
    }

    public void setEnseignent(Personne enseignent) {
        if (enseignent.isEnseignant()){ this.enseignent = enseignent; }
    }

    @Override
    public String toString() {
        return "\nIndisponibilite{" +
                "enseignent=" + enseignent +
                "} " + super.toString();
    }
}
