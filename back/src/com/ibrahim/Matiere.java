package com.ibrahim;

public class Matiere {
    private int id;
    private String nom;
    private String description;
    private Personne responsable;
    private int duree_examen;

    public Matiere(int id, String nom, String description, Personne responsable, int duree_examen){
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.responsable = responsable;
        this.duree_examen = duree_examen;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getNom() {
        return nom;
    }

    public Personne getResponsable() {
        return responsable;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDuree_examen() {
        return duree_examen;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setResponsable(Personne responsable) {
        this.responsable = responsable;
    }

}
