use colored::*;

#[derive(Default, Copy, Clone, Debug)]
pub(crate) struct MessageCounts {
    pub(crate) no_match_found: i32,
    pub(crate) multiple_matches_found: i32,
    pub(crate) one_match_found: i32,
}

struct Weights {
    no_match_found: f64,
    multiple_matches_found: f64,
    one_match_found: f64,
}

fn calculate_score(obj: &MessageCounts) -> f64 {
    let weights = Weights {
        no_match_found: -1.0, // We want to minimize this, so it gets a negative weight
        multiple_matches_found: 0.75, // Assume this is less important than "one match found"
        one_match_found: 1.0, // We want to maximize this, so it gets a positive weight
    };

    let mut score = 0.0;
    score += weights.no_match_found * (obj.no_match_found as f64);
    score += weights.multiple_matches_found * (obj.multiple_matches_found as f64);
    score += weights.one_match_found * (obj.one_match_found as f64);

    score
}

pub(crate) fn compare_solutions(before: &MessageCounts, after: &MessageCounts) -> String {
    let score1 = calculate_score(before);
    let score2 = calculate_score(after);

    if score1 > score2 {
        return "Previous solution was better!".red().to_string();
    } else if score1 < score2 {
        return "The new solution is better!".green().to_string();
    }
    return "The solutions are equivalent.".yellow().to_string();
}
