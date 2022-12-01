package com.greglturnquist.payroll.Controller;

import com.greglturnquist.payroll.Model.Personne;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonneRepository extends JpaRepository<Personne, Long>{ }
