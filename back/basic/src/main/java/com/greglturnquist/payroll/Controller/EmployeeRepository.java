package com.greglturnquist.payroll.Controller;

import com.greglturnquist.payroll.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {}
