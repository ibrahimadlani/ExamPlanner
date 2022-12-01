package com.greglturnquist.payroll.Controller;

import com.greglturnquist.payroll.Model.Indisponibilite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndisponibiliteRepository extends JpaRepository<Indisponibilite, Long> {
}
