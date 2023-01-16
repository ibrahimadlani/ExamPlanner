package com.greglturnquist.payroll.MinMax;

import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;

public class MiniMax {
    Tree tree;

    public void constructTree(int nombrePlanning) {
        tree = new Tree();
        Node root = new Node(nombrePlanning, true);
        tree.setRoot(root);
        constructTree(root);
    }

    private void constructTree(Node parentNode) {
        List<Integer> listofPossibleHeaps
                = PlanningGeneration.getPossibleStates(parentNode.getNombrePlanning());
        boolean isChildMinPlayer = !parentNode.isMinPlayer();
        listofPossibleHeaps.forEach(n -> {
            Node newNode = new Node(n, isChildMinPlayer);
            parentNode.addChild(newNode);
            if (newNode.getNombrePlanning() > 0) {
                constructTree(newNode);
            }
        });
    }

    public Node checkWin() {
        Node root = tree.getRoot();
        checkWin(root);
        return root;
    }

    private void checkWin(Node node) {
        List<Node> children = node.getChildren();
        boolean isMinPlayer = node.isMinPlayer();
        children.forEach(child -> {
            if (child.getNombrePlanning() == 0) {
                child.setScore(isMinPlayer ? 1 : -1);
            } else {
                checkWin(child);
            }
        });
        Node bestChild = findBestChild(isMinPlayer, children);
        node.setScore(bestChild.getScore());
    }

    private Node findBestChild(boolean isMaxPlayer, List<Node> children) {
        Comparator<Node> byScoreComparator = Comparator.comparing(Node::getScore);
        return children.stream()
                .min(isMaxPlayer ? byScoreComparator : byScoreComparator.reversed())
                .orElseThrow(NoSuchElementException::new);
    }

    public Tree getTree() {
        return tree;
    }

    public void setTree(Tree tree) {
        this.tree = tree;
    }
}
