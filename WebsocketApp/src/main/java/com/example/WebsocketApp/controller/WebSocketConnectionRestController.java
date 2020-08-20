package com.example.WebsocketApp.controller;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.WebsocketApp.utils.ActiveUserManager;

@RestController
public class WebSocketConnectionRestController {
	
	@Autowired
    private ActiveUserManager activeSessionManager;
	
	@PostMapping("/rest/user-connect")
	public String userConnect(HttpServletRequest request, @ModelAttribute("username") String username) {
		String remoteAddr = "";
		
		if(request !=  null) {
			remoteAddr = request.getHeader("Remote_addr");
			
			if (StringUtils.isEmpty(remoteAddr)) {
                remoteAddr = request.getHeader("X-FORWARDED-FOR");
                if (remoteAddr == null || "".equals(remoteAddr)) {
                    remoteAddr = request.getRemoteAddr();
                }
            }
		}
		
		activeSessionManager.add(username, remoteAddr);
        return remoteAddr;
	}
	
	@PostMapping("/rest/user-disconnect")
    public String userDisconnect(@ModelAttribute("username") String userName) {
        activeSessionManager.remove(userName);
        return "disconnected";
    }
	
	@GetMapping("/rest/active-users-except/{userName}")
    public Set<String> getActiveUsersExceptCurrentUser(@PathVariable String userName) {
        return activeSessionManager.getActiveUsersExceptCurrentUser(userName);
    }
}
