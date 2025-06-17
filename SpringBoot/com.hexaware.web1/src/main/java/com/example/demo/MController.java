package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@SuppressWarnings("unused")
@Controller
public class MController {
	@RequestMapping("/home")
	public String home(){
		return "home";
	}
	@RequestMapping("/About")
	public String About(){
		return "About";
	}
}
	