import Link from "next/link";

const About = () => {
  return (
    <p className="text-gray-400 text-sm italic text-justify">
      This website is not affiliated with UCLA. Grade distribution data was
      sourced through a February 2023{" "}
      <a
        target="_blank"
        rel="noreferrer"
        className="text-uclaBlue hover:opacity-50"
        href="https://drive.google.com/file/d/1l-R7LN9jOFUic3b4WTk4WxfDSjGNpuVw/view?usp=sharing"
      >
        public records request
      </a>{" "}
      made under the California Public Records Act.{" "}
      <Link className="text-uclaBlue hover:opacity-50" href="/shoutouts">
        40+
      </Link>{" "}
      UCLA students{" "}
      <a
        className="text-uclaBlue hover:opacity-50"
        target="_blank"
        rel="noreferrer"
        href="https://drive.google.com/file/d/14LuoYaDCPUmts_6igA8rC3AVI2Ntyvqc/view?usp=sharing"
      >
        paid $131.25
      </a>{" "}
      to obtain these records.
      <br />
      <br />
      UCLA students can download the data{" "}
      <a
        className="text-uclaBlue hover:opacity-50"
        target="_blank"
        rel="noreferrer"
        href="https://docs.google.com/spreadsheets/d/1kF7eK8Iyyv_LnE2IY9vg2VEuDuoYi5qO/edit?usp=sharing&ouid=105052985987772221837&rtpof=true&sd=true"
      >
        on Google Drive
      </a>{" "}
      (log into your UCLA Google Account to access). Source code for this site is <a
        href="https://github.com/nathanhleung/grades.natecation.xyz"
        target="_blank"
        rel="noopener noreferrer"
        className="text-uclaBlue hover:opacity-50"
      >
        on GitHub
      </a>; contributions are welcome and appreciated.
    </p>
  );
};

export { About };
