import router from "@/router";

export function handleRoute(path: string, isUrl = false): void {
  if (isUrl) {
    window.location.href = path;
  } else {
    router.push(path);
  }
}
