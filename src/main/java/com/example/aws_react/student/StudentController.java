package com.example.aws_react.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;


@RestController
@RequestMapping(path = "api/students")
@AllArgsConstructor
public class StudentController {

        private final StudentService studentService;

        @GetMapping
        public List<Student> getAllStudents() {
                return studentService.getAllStudents();
        }

        @PostMapping
        public void addStudentString(@RequestBody Student student) {
            /*TODO: Needs validation*/

            studentService.addStudent(student);
        }
        
}
