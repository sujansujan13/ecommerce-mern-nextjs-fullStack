export function getCategoryFromPath(pathname: string) {
  const parts = pathname.split("/");
  if (parts[1] === "product") {
    return parts[2]; // electronics
  }
  return parts[1];
}
