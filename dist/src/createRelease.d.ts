declare const createRelease: ({ target, ref, owner, repo, baseBranch, useNameFromRef, }: {
    target: string;
    ref: string;
    owner: string;
    repo: string;
    baseBranch: string;
    useNameFromRef?: boolean | undefined;
}) => Promise<{
    commits: {
        url: string;
        sha: string;
        node_id: string;
        html_url: string;
        comments_url: string;
        commit: {
            url: string;
            author: {
                name?: string | undefined;
                email?: string | undefined;
                date?: string | undefined;
            } | null;
            committer: {
                name?: string | undefined;
                email?: string | undefined;
                date?: string | undefined;
            } | null;
            message: string;
            comment_count: number;
            tree: {
                sha: string;
                url: string;
            };
            verification?: {
                verified: boolean;
                reason: string;
                payload: string | null;
                signature: string | null;
            } | undefined;
        };
        author: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        committer: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        parents: {
            sha: string;
            url: string;
            html_url?: string | undefined;
        }[];
        stats?: {
            additions?: number | undefined;
            deletions?: number | undefined;
            total?: number | undefined;
        } | undefined;
        files?: {
            sha: string;
            filename: string;
            status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
            additions: number;
            deletions: number;
            changes: number;
            blob_url: string;
            raw_url: string;
            contents_url: string;
            patch?: string | undefined;
            previous_filename?: string | undefined;
        }[] | undefined;
    }[];
    newVersion?: undefined;
} | {
    newVersion: string;
    commits: {
        url: string;
        sha: string;
        node_id: string;
        html_url: string;
        comments_url: string;
        commit: {
            url: string;
            author: {
                name?: string | undefined;
                email?: string | undefined;
                date?: string | undefined;
            } | null;
            committer: {
                name?: string | undefined;
                email?: string | undefined;
                date?: string | undefined;
            } | null;
            message: string;
            comment_count: number;
            tree: {
                sha: string;
                url: string;
            };
            verification?: {
                verified: boolean;
                reason: string;
                payload: string | null;
                signature: string | null;
            } | undefined;
        };
        author: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        committer: {
            name?: string | null | undefined;
            email?: string | null | undefined;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string | undefined;
        } | null;
        parents: {
            sha: string;
            url: string;
            html_url?: string | undefined;
        }[];
        stats?: {
            additions?: number | undefined;
            deletions?: number | undefined;
            total?: number | undefined;
        } | undefined;
        files?: {
            sha: string;
            filename: string;
            status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
            additions: number;
            deletions: number;
            changes: number;
            blob_url: string;
            raw_url: string;
            contents_url: string;
            patch?: string | undefined;
            previous_filename?: string | undefined;
        }[] | undefined;
    }[];
}>;
export default createRelease;
