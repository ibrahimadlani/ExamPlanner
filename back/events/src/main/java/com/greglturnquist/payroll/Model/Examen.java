package com.greglturnquist.payroll.Model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
public class Examen extends Creneau{
    @ManyToOne
    @JoinColumn(name = "matiere_id")
    private Matiere matiere;

    public Examen(LocalDateTime debut, int duree_min, Matiere matiere){
        super(debut, duree_min);
        this.matiere = matiere;
    }

    public Examen() {

    }

    public Matiere getMatiere() {
        return matiere;
    }
    public void setMatiere(Matiere matiere) {
        this.matiere = matiere;
    }

    @Override
    public String toString() {
        return "\nExamen{" +
                "matiere=" + matiere +
                "} " + super.toString();
    }
}
