package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Comment;
import net.javaguides.springboot.repository.CommentRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CommentController {

	@Autowired
	private CommentRepository commentRepository;

	// get all comments
	@GetMapping("/comments")
	public List<Comment> getAllComments() {
		return commentRepository.findAll();
	}

	// create comment rest api
	@PostMapping("/comments")
	public Comment createComment(@RequestBody Comment comment) {
		return commentRepository.save(comment);
	}

	// get comment by id rest api
	@GetMapping("/comments/{id}")
	public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Comment not exist with id :" + id));
		return ResponseEntity.ok(comment);
	}

	// update comment rest api

	@PutMapping("/comments/{id}")
	public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment commentDetails) {
		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Comment not exist with id :" + id));

		comment.setComment(commentDetails.getComment());
		comment.setDescription(commentDetails.getDescription());
		comment.setUserId(commentDetails.getUserId());

		Comment updatedComment = commentRepository.save(comment);
		return ResponseEntity.ok(updatedComment);
	}

	// delete comment rest api
	@DeleteMapping("/comments/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteComment(@PathVariable Long id) {
		Comment comment = commentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Comment not exist with id :" + id));

		commentRepository.delete(comment);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
