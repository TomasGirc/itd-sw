// StarWarsCrawl.test.tsx
import StarWarsCrawl from "@/app/components/effects/starWarsCrawl";
import { render, screen, fireEvent } from "@testing-library/react";

describe("StarWarsCrawl", () => {
  const crawlText = `A long time ago in a galaxy far, far away...`;

  it("renders the text", () => {
    render(<StarWarsCrawl text={crawlText} />);
    expect(screen.getByText(crawlText)).toBeInTheDocument();
  });

  it("starts with crawl class", () => {
    render(<StarWarsCrawl text={crawlText} />);
    const crawlDiv = screen.getByText(crawlText);
    expect(crawlDiv).toHaveClass("crawl");
  });

  it("toggles stopped class on click", () => {
    render(<StarWarsCrawl text={crawlText} />);
    const container = screen.getByTitle("Click to toggle crawl");
    const crawlDiv = screen.getByText(crawlText);

    expect(crawlDiv).toHaveClass("crawl");

    fireEvent.click(container);
    expect(screen.getByText(crawlText)).toHaveClass("stopped");

    fireEvent.click(container);
    expect(screen.getByText(crawlText)).toHaveClass("crawl");
  });

  it("applies custom duration", () => {
    const duration = 10;
    render(<StarWarsCrawl text={crawlText} duration={duration} />);
    const crawlDiv = screen.getByText(crawlText);
    expect(crawlDiv).toHaveStyle(`animation-duration: ${duration}s`);
  });
});
