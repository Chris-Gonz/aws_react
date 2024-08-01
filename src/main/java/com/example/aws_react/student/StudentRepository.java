package com.example.aws_react.student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    public Student findByEmail(String email);
    public boolean existsByEmail(String email);

}
