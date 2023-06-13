package com.example.aws_react.Student;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Student {
    private Long id;
    private String name;
    private String email;
    private  Gender gender;
}
