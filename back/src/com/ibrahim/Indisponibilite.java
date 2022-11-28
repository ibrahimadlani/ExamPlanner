package com.ibrahim;

import java.util.Date;

public class Indisponibilite extends Creneau{
    private Personne enseignent;

    public Indisponibilite(int id, Date debut, int duree_min, Personne enseignent){
        super(id, debut, duree_min);
        if (enseignent.isEnseignant()){ this.enseignent = enseignent; }
    }

    public Personne getEnseignent() {
        return enseignent;
    }

    public void setEnseignent(Personne enseignent) {
        if (enseignent.isEnseignant()){ this.enseignent = enseignent; }
    }
}
