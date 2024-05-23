import { useEffect } from "react";

const MetaTags = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaOGTitle = document.querySelector('meta[name="og:title"]');
    const metaOGDescription = document.querySelector(
      'meta[name="og:description"]'
    );

    if (description) {
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    if (description) {
      if (metaOGDescription) {
        metaOGDescription.setAttribute("content", description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "og:description";
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    if (title) {
      if (metaOGTitle) {
        metaOGTitle.setAttribute("content", title);
      } else {
        const meta = document.createElement("meta");
        meta.name = "og:title";
        meta.content = title;
        document.head.appendChild(meta);
      }
    }

    // Cleanup function
    return () => {
      if (title) {
        document.title = "";
      }
      if (metaDescription) {
        metaDescription.setAttribute("content", "");
      }
      if (metaOGDescription) {
        metaOGDescription.setAttribute("content", "");
      }
      if (metaOGTitle) {
        metaOGTitle.setAttribute("content", "");
      }
    };
  }, [title, description]);

  return null;
};

export default MetaTags;
