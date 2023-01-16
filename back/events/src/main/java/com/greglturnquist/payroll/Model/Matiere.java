package com.greglturnquist.payroll.Model;

import javax.persistence.*;

@Entity
public class Matiere {
    private @Id
    @GeneratedValue
    Long id;
    private String nom;
    @Column(columnDefinition="TEXT")
    private String description;
    @ManyToOne
    @JoinColumn(name = "responsable_id")
    private Personne responsable;
    private int duree_examen;

    public Matiere(String nom, String description, Personne responsable, int duree_examen){
        this.nom = nom;
        this.description = description;
        this.responsable = responsable;
        this.duree_examen = duree_examen;
    }

    public Matiere() {
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

    public void setDuree_examen(int duree_examen) {
        this.duree_examen = duree_examen;
    }
}
