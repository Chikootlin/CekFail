import ParticleBackground from "../components/particleBackground"

export default function About(){
    return (
        <>
            <div className="relative min-h-screen md:min-h-0 overflow-hidden">
                <ParticleBackground/>
                <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 space-y-10">
                    <section>
                        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                            What?
                        </h1>
                        <p className="mt-4 text-sm font-light text-[#AEAEAE] text-justify leading-relaxed sm:text-base md:text-lg">
                            CekFail is a simple web app for analysing file and extract the hidden information without have to deal with complex tools. It provides such as file metadata, hash values, readable strings, suspicious strings and binary previews.
                        </p>
                    </section>
                    <section>
                        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                            Why?
                        </h1>
                        <p className="mt-4 text-sm font-light text-[#AEAEAE] text-justify leading-relaxed sm:text-base md:text-lg">
                            Many files nowadays can appear to be harmless but may contain hidden data or malware. This project was made to help users better understand what&apos;s inside a file before trusting or executing it.
                        </p>
                    </section>
                    <section>
                        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                            Who?
                        </h1>
                        <p className="mt-4 text-sm font-light text-[#AEAEAE] text-justify leading-relaxed sm:text-base md:text-lg">
                            This web is expected that it will be useful for cybersecurity enthusiasts, students, or beginner who want to analyze files and understand the potential security risks in a simple way.
                        </p>
                    </section>
                    <section>
                        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                            Aim?
                        </h1>
                        <p className="mt-4 text-sm font-light text-[#AEAEAE] text-justify leading-relaxed sm:text-base md:text-lg">
                            The goal of CekFail is to provide a simple yet powerful tool for analyzing files, while also serving as a learning platform for understanding how digital forensic techniques work in real scenarios.
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}