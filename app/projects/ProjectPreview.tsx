"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { Project } from "../../lib/project-showcase";
import MotionSurface from "../motion/MotionSurface";
import styles from "./showcase.module.css";

export default function ProjectPreview({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const depth = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const images = [
    ...new Set(
      [
        project.cover_url,
        ...[...project.project_media]
          .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
          .filter((item) => item.media_type !== "video")
          .map((item) => item.media_url),
      ].filter((url): url is string => Boolean(url)),
    ),
  ];
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState(false);
  const [imageRatio, setImageRatio] = useState(0.65);
  const href = `/projects/${project.slug}`;

  return (
    <MotionSurface className={styles.caseStudy} delay={0.06}>
      <div className={styles.story}>
        <div className={styles.projectIndex}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category}</span>
        </div>
        {project.is_featured && (
          <span className={styles.featured}>Featured project</span>
        )}
        <h3>
          <Link href={href}>{project.title}</Link>
        </h3>
        {project.client_name && (
          <p className={styles.client}>For {project.client_name}</p>
        )}
        {project.description && (
          <p className={styles.description}>{project.description}</p>
        )}
        <Link href={href} className={styles.explore}>
          Explore project{" "}
          <span>
            <ArrowUpRight size={21} aria-hidden="true" />
          </span>
        </Link>
        {images.length > 1 && (
          <div className={styles.storyFooter}>
            <span>{images.length} project images</span>
          </div>
        )}
      </div>
      <div ref={frame} className={styles.stage}>
        <div className={styles.stageLabel} aria-hidden="true">
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span>Preview</span>
          <span>
            {String(selected + 1).padStart(2, "0")} /{" "}
            {String(Math.max(images.length, 1)).padStart(2, "0")}
          </span>
        </div>
        <motion.div className={styles.visual} style={{ y: depth }}>
          <Link
            href={href}
            className={styles.preview}
            aria-label={`Explore ${project.title}`}
            style={{
              width: `min(100%, calc(var(--preview-height) * ${imageRatio}))`,
            }}
          >
            {images[selected] && !failed ? (
              <Image
                key={images[selected]}
                src={images[selected]}
                alt={`${project.title} — project preview ${selected + 1}`}
                fill
                sizes="(max-width: 600px) 150px, 400px"
                onError={() => setFailed(true)}
                onLoad={(event) => {
                  const image = event.currentTarget;
                  if (image.naturalHeight)
                    setImageRatio(
                      Math.max(
                        0.35,
                        Math.min(1.8, image.naturalWidth / image.naturalHeight),
                      ),
                    );
                }}
              />
            ) : (
              <div className={styles.placeholder}>
                <ImageIcon size={38} strokeWidth={1} aria-hidden="true" />
                <span>{project.title}</span>
              </div>
            )}
          </Link>
        </motion.div>
        {images.length > 1 && (
          <div
            className={styles.gallery}
            role="group"
            aria-label={`${project.title} previews`}
          >
            {images.slice(0, 4).map((url, imageIndex) => (
              <button
                key={url}
                type="button"
                aria-label={`Show ${project.title} image ${imageIndex + 1}`}
                aria-pressed={selected === imageIndex}
                onClick={() => {
                  setSelected(imageIndex);
                  setFailed(false);
                }}
              >
                <Image src={url} alt="" fill sizes="56px" />
              </button>
            ))}
            {images.length > 4 && (
              <Link href={href}>
                +{images.length - 4}
                <span className={styles.srOnly}>
                  {" "}
                  more images of {project.title}
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </MotionSurface>
  );
}
