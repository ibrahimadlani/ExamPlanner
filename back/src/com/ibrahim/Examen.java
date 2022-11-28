package com.ibrahim;

import java.util.Date;

public class Examen extends Creneau{
    private Matiere matiere;

    public Examen(int id, Date debut, int duree_min, Matiere matiere){
        super(id, debut, duree_min);
        this.matiere = matiere;
    }

    public Matiere getMatiere() {
        return matiere;
    }
    public void setMatiere(Matiere matiere) {
        this.matiere = matiere;
    }
}
