import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { getAllBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static routes
  const staticRoutes = [
    "",
    "/gioi-thieu",
    "/dich-vu",
    "/bang-gia",
    "/blog",
    "/faq",
    "/lien-he",
    "/chinh-sach-bao-mat",
    "/dieu-khoan-su-dung",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Service Detail routes
  const serviceRoutes = siteConfig.services.map((svc) => ({
    url: `${baseUrl}/dich-vu/${svc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Blog post routes
  const posts = await getAllBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
