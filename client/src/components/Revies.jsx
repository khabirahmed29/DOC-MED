import React from "react";
import { reviews } from "../constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const avatarColors = [
  { background: "#1685b4", foreground: "#ffffff", border: "#1685b4" },
  { background: "#7c3aed", foreground: "#ffffff", border: "#7c3aed" },
  { background: "#15803d", foreground: "#ffffff", border: "#15803d" },
  { background: "#b45309", foreground: "#ffffff", border: "#b45309" },
  { background: "#be185d", foreground: "#ffffff", border: "#be185d" },
  { background: "#0e7490", foreground: "#ffffff", border: "#0e7490" },
];

const getAvatarColors = (name = "") => {
  const hash = [...name.toLowerCase()].reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );
  return avatarColors[hash % avatarColors.length];
};

const Reviews = () => {
  return (
    <div className="box-container">
      {reviews.map((review, index) => (
        <Card
          className="review-card"
          key={`${review.name}-${index}`}
          style={{
            "--review-avatar-background": getAvatarColors(review.name)
              .background,
            "--review-avatar-foreground": getAvatarColors(review.name)
              .foreground,
            "--review-avatar-border": getAvatarColors(review.name).border,
          }}
        >
          <CardHeader className="review-card-header">
            <Avatar className="review-card-avatar">
              <AvatarFallback
                className="review-card-avatar-fallback"
                style={{
                  backgroundColor: getAvatarColors(review.name).background,
                  color: getAvatarColors(review.name).foreground,
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                {getInitials(review.name)}
              </AvatarFallback>
            </Avatar>
            <div className="review-card-author">
              <CardTitle className="review-card-name">{review.name}</CardTitle>
              <CardDescription className="review-title">
                {review.title}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="review-card-content">
            <p>{review.rev}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Reviews;
