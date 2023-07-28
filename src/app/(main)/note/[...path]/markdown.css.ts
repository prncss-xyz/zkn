import { vars } from "@/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const markdown = style({});
// https://www.w3schools.com/cssref/css_default_values.php

globalStyle(`${markdown}>*:first-child`, {
  marginTop: 0,
});

globalStyle(`${markdown}>*:last-child`, {
  marginBottom: 0,
});

globalStyle(`${markdown} h1`, {
  fontSize: "2em",
  marginTop: "0.67em",
  marginBottom: "0,67em",
  fontWeight: "bold",
});

globalStyle(`${markdown} h2`, {
  fontSize: "1.5em",
  marginTop: "0.83em",
  marginBottom: "0,83em",
  fontWeight: "bold",
});

globalStyle(`${markdown} h3`, {
  fontSize: "1.17em",
  marginTop: "1em",
  marginBottom: "1em",
  fontWeight: "bold",
});

globalStyle(`${markdown} h4`, {
  marginTop: "1.33em",
  marginBottom: "1.33em",
  fontWeight: "bold",
});

globalStyle(`${markdown} h5`, {
  fontSize: "0.83em",
  marginTop: "1.67em",
  marginBottom: "1,67em",
  fontWeight: "bold",
});

globalStyle(`${markdown} h6`, {
  fontSize: "0.67em",
  marginTop: "0.5em",
  marginBottom: "0,5em",
  fontWeight: "bold",
});

globalStyle(`${markdown} p`, {
  marginTop: "1em",
  marginBottom: "1em",
});

globalStyle(`${markdown} small`, {
  fontSize: "80%",
});

globalStyle(`${markdown} sup`, {
  position: "relative",
  top: "-0.5em",
  fontSize: "80%",
});

globalStyle(`${markdown} sub`, {
  position: "relative",
  top: "0.5em",
  fontSize: "80%",
});

globalStyle(`${markdown} blockquote`, {
  marginLeft: 40,
  marginRight: 40,
  fontSize: "90%",
});

globalStyle(`${markdown} ul, ${markdown} ol`, {
  // display: "block",
  marginTop: "1em",
  marginBottom: "1em",
  marginLeft: 0,
  marginRight: 0,
  paddingLeft: 40,
});

globalStyle(`${markdown} ul`, {
  listStyleType: "disc",
});

globalStyle(`${markdown} ol`, {
  listStyleType: "decimal",
});

globalStyle(`${markdown} li`, {
  // display: "list-item",
});

globalStyle(`${markdown} hr`, {
  // display: "block",
  marginTop: "0.5em",
  marginBottom: "0.5em",
  marginLeft: "auto",
  marginRight: "auto",
  borderStyle: "inset",
  borderWidth: "1px",
});

globalStyle(`${markdown} dl`, {
  marginTop: "1",
  marginBottom: "1",
});

globalStyle(`${markdown} mark`, {
  backgroundColor: vars.colors.active,
});

globalStyle(`${markdown} mark`, {
  backgroundColor: vars.colors.active,
});

globalStyle(`${markdown} table`, {
  borderColor: vars.colors.text,
  borderCollapse: "collapse",
});

globalStyle(`${markdown} thead`, {
  textAlign: "center",
});

globalStyle(`${markdown} table, ${markdown} th, ${markdown} td`, {
  borderStyle: "solid",
  borderWidth: 1,
});

globalStyle(`${markdown} th, ${markdown} td`, {
  padding: 2,
});
