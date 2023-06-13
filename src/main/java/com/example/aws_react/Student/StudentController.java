package com.example.aws_react.Student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents(){
        List<Student> students = Arrays.asList(
                new Student(
                        1L,
                        "Chris",
                        "chris@gmu.edu",
                        Gender.MALE
                ),
                new Student(
                        2L,
                        "Emily",
                        "emily@gmu.edu",
                        Gender.FEMALE
                )
        );
        return students;
    }
}
