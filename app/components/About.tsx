const About = () => {
    return (
        <p className="text-gray-400 dark:text-gray-700 text-sm italic">
            Grade distribution data was sourced through a
            {" "}
            <a
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 dark:text-blue-800 hover:opacity-50"
                href="https://drive.google.com/file/d/1l-R7LN9jOFUic3b4WTk4WxfDSjGNpuVw/view?usp=sharing"
            >
                public records request
            </a>{" "}
            made under the California Public Records Act. We{" "}
            <a
                className="text-blue-400 dark:text-blue-800 hover:opacity-50"
                target="_blank"
                rel="noreferrer"
                href="https://drive.google.com/file/d/14LuoYaDCPUmts_6igA8rC3AVI2Ntyvqc/view?usp=sharing"
            >
                raised $131.25
            </a>{" "}
            from UCLA students to obtain these records.<br /><br />UCLA students can download the data{" "}
            <a
                className="text-blue-400 dark:text-blue-800 hover:opacity-50"
                target="_blank"
                rel="noreferrer"
                href="https://docs.google.com/spreadsheets/d/1kF7eK8Iyyv_LnE2IY9vg2VEuDuoYi5qO/edit?usp=sharing&ouid=105052985987772221837&rtpof=true&sd=true"
            >
                on Google Drive
            </a>{" "}(log into your UCLA Google Account to access).
        </p>
    )
}

export { About }