import { Record } from 'immutable';

export const Plan = new Record({
    id: null,
    name: "",
    image: "",
    price: 0,
    saveUpMessage: "",
    customizationOptions: "",
    custommerSupport: "",
    createdAt: "",
    isPopular: "",
    discountPerYear: 0,
    enabled: true,
    storiesPerMonth: 0,
    voiceSynthesis: null,
    description: null
});

export const createPlan = (data) => {
    return new Plan({
        ...data,
        saveUpMessage: data?.save_up_message,
        customizationOptions: data?.customization_options,
        custommerSupport: data?.custommer_support,
        createdAt: data?.created_at,
        isPopular: data?.is_popular,
        discountPerYear: data?.discount_per_year,
        enabled: data?.enabled,
        storiesPerMonth: data?.stories_per_month,
        voiceSynthesis: data?.voice_synthesis,
    })
}