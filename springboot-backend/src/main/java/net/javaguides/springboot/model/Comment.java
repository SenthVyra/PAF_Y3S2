package net.javaguides.springboot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "comment")
	private String comment;

	@Column(name = "last_name")
	private String description;

	@Column(name = "user_id")
	private String userId;

	public Comment() {

	}

	public Comment(String comment, String description, String userId) {
		super();
		this.comment = comment;
		this.description = description;
		this.userId = userId;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}
