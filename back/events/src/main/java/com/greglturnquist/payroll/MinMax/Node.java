package com.greglturnquist.payroll.MinMax;

import java.util.ArrayList;
import java.util.List;

public class Node {
    int nombrePlanning;
    boolean isMinPlayer;
    int score;
    List<Node> children;

    public Node(int nombrePlanning, boolean isMaxPlayer) {
        this.nombrePlanning = nombrePlanning;
        this.isMinPlayer = isMaxPlayer;
        this.children = new ArrayList<>();
    }

    public void addChild(Node newNode) {
        this.getChildren().add(newNode);
    }

    public int getNombrePlanning() {
        return nombrePlanning;
    }

    public void setNombrePlanning(int nombrePlanning) {
        this.nombrePlanning = nombrePlanning;
    }

    public boolean isMinPlayer() {
        return isMinPlayer;
    }

    public void setMinPlayer(boolean minPlayer) {
        isMinPlayer = minPlayer;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<Node> getChildren() {
        return children;
    }

    public void setChildren(List<Node> children) {
        this.children = children;
    }
}
