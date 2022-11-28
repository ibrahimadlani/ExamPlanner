package com.ibrahim;

import java.util.List;

public class Specialite {
    private int id;
    private String titre;
    private String description;
    private List<Matiere> matieres;

    public Specialite(int id, String titre, String description, List<Matiere> matieres){
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.matieres = matieres;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getTitre() {
        return titre;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public List<Matiere> getMatieres() {
        return matieres;
    }

    public void setMatieres(List<Matiere> matieres) {
        this.matieres = matieres;
    }

}
