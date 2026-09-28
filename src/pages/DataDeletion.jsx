import dataDeletion from "../data/legal/dataDeletion";

const DataDeletion = () => {
    return (
        <main className="min-h-screen bg-base-100">
            <div className="mx-auto max-w-4xl px-6 py-12">
                <h1 className="text-4xl font-bold">
                    {dataDeletion.title}
                </h1>

                <p className="mt-2 text-sm text-base-content/60">
                    Last updated: {dataDeletion.lastUpdated}
                </p>

                <div className="mt-10 space-y-8">
                    {dataDeletion.sections.map(
                        (section) => (
                            <section
                                key={section.title}
                            >
                                <h2 className="text-xl font-semibold">
                                    {section.title}
                                </h2>

                                <p className="mt-3 leading-7 text-base-content/80">
                                    {section.content}
                                </p>
                            </section>
                        )
                    )}
                </div>
            </div>
        </main>
    );
};

export default DataDeletion;