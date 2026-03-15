import { useQuery } from "@tanstack/react-query"
import api from "../api/api"
import { useEffect } from "react";

export const useFetchMyShortUrls = (token, onError) => {
    const query = useQuery({
        queryKey: ["my-shortenurls"],
        queryFn: async () => {
            return await api.get("/api/urls/myurls", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
        },
        select: (data) => {
            return data.data.sort(
                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
            );
        },
        staleTime: 5000,
    });

    useEffect(() => {
        if (query.error) onError(query.error);
    }, [query.error]);

    return query;
};

export const useFetchTotalClicks = (token, onError) => {
    const query = useQuery({
        queryKey: ["url-totalclick"],
        queryFn: async () => {
            return await api.get(
                "/api/urls/analytics/totalClicks?startDate=2026-01-01&endDate=2026-12-31",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
        },
        select: (data) => {
            return Object.keys(data.data).map((key) => ({
                clickDate: key,
                count: data.data[key],
            }));
        },
        staleTime: 5000,
    });

    useEffect(() => {
        if (query.error) onError(query.error);
    }, [query.error]);

    return query;
};