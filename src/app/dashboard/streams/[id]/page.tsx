import StreamPlayer from "@/components/StreamPlayer";
import { prisma } from "@/lib/db";
import { Title } from "@mantine/core";
import { notFound } from "next/navigation";

export default async function StreamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: fixtureId } = await params;
    const stream = await prisma.stream.findUnique({
        where: {
            fixtureId,
        }
    });

    if (!stream) {
        return notFound();
    }

    return <>
        <Title order={1}>
            {stream.name}
        </Title>

        {stream.state !== 'Pending' && <StreamPlayer streamId={stream.fixtureId} isLive={stream.state === 'Live'} />}
    </>
}
