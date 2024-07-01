package com.example.aws_react.student;

import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

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

        @DeleteMapping(path = "{studentId}")
        public void deleteStudent(
                @PathVariable("studentId") Long studentId) {
                studentService.deleteStudent(studentId);

        }

        @PutMapping(path = "studentId")
        public void updateStudent(@RequestBody Student student) {
                studentService.updateStudent(student);

        }

}
